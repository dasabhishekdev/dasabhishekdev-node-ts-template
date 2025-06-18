import mongoose, { Model, Document, Schema } from "mongoose";

interface ICounter extends Document {
  id: string;
  serial_number: number;
}

interface CounterModel extends Model<ICounter> {
  getNextSequence(id: string): Promise<number>;
}

// Counter schema to manage serial numbers for user documents
const counter_schema = new Schema<ICounter>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  serial_number: {
    type: Number,
    required: true,
    unique: true,
  },
});

// Pre-save hook to initialize the serial number if it doesn't exist
counter_schema.statics.getNextSequence = async function (
  id: string
): Promise<number> {
  const counter = await this.findOneAndUpdate(
    { id },
    { $inc: { serial_number: 1 } },
    { new: true, upsert: true }
  );
  return counter.serial_number;
};

const Counter = mongoose.model<ICounter, CounterModel>(
  "Counter",
  counter_schema
);
export default Counter;
