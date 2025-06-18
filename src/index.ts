import app from './app';
import loaders from './loaders'; // Import the centralized loader
import './environment';

const startServer = async () => {
  try {
    await loaders({ expressApp: app });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`---- Server listening on port ${PORT} ----`);
      console.log(`Server is accessible at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
};

startServer();
