// import mongoose from "mongoose"

// const connectDb = async ()=> {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)
//         console.log("db connected")
//     } 
//     catch(error) {
//         console.log(`db error ${error}`)
//     }
// }

// export default connectDb


import mongoose from "mongoose";
import dns from "dns";

const overrideNodeDnsIfNeeded = () => {
    const configured = dns.getServers();
    console.log("Current DNS servers:", configured);

    // Override only if Node is using a localhost resolver
    if (
        configured.length === 1 &&
        configured[0].startsWith("127.")
    ) {
        const dnsServer = process.env.MONGODB_DNS_SERVER || "8.8.8.8";

        try {
            dns.setServers([dnsServer]);
            console.log(`Node DNS resolver overridden to ${dnsServer}`);
        } catch (err) {
            console.error("Failed to override DNS:", err.message);
        }
    } else {
        console.log("Using system DNS:", configured.join(", "));
    }
};

const connectDb = async () => {
    overrideNodeDnsIfNeeded();

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error("MONGODB_URI is not defined.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDb;