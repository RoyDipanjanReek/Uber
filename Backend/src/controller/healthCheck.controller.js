import { getDbStatus } from "../config/db.config"

export const healthCheck = async (req, res) => {

    try {
        const databaseStatus = getDbStatus()

        const healthStatus = {
            status: "OK",
            timeStamp: new Date().toISOString(),
            services: {
                database: {
                    status: databaseStatus.isConnected ? "healthy" : "unhealthy",
                    details: {
                        ...databaseStatus,
                        readyState: getReadyStateText(databaseStatus.readyState)
                    },
                },
                server: {
                    status: "healthy",
                    uptime: process.uptime(),
                    memoryUsege: process.memoryUsage()
                },
            },
        };

        const httpStatus = healthStatus.services.database.status === "healthy" ? 200 : 503

        res.status(httpStatus).json(healthStatus)
    } catch (error) {
        console.error('health ckeck failed',error)
    res.status(500).json({
        status: 'ERROR',
        timeStamp: new Date().toISOString(),
        error: error.message
    })
    }
}

//utility method
function getReadyStateText(state) {
  switch (state) {
    case 0:
      return "Database is disconnected";
    case 1:
      return "Database is connected";
    case 2:
      return "Database is connecting";
    case 3:
      return "Database is disconnecting";
    default:
      return "unknown error occur";
  }
}