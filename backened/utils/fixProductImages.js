import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

dotenv.config();

// Real confirmed working image URLs or reliable placeholder per product
// Using https://placehold.co with product name — always loads, no hotlink issues
// Format: https://placehold.co/400x400/1a1a2e/ffffff?text=ProductName

const imageMap = [
    {
        name: "FieldLogger",
        // This one confirmed 200 from Novus CDN
        image: "https://cdn.novusautomation.com/catalogos/t-multichannel_industrial_data_logger_fieldlogger_image_01.webp",
    },
    {
        name: "LogBox-AA",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=LogBox-AA",
    },
    {
        name: "LogBox-RHT-LCD",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=LogBox-RHT-LCD",
    },
    {
        name: "LogBox Wi-Fi",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=LogBox+Wi-Fi",
    },
    {
        name: "LogBox LTE",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=LogBox+LTE",
    },
    {
        name: "LogBox BLE",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=LogBox+BLE",
    },
    {
        name: "N1500 PID Controller",
        // Confirmed 200 from Novus CDN
        image: "https://cdn.novusautomation.com/catalogos/t-n2000_image_01.webp",
    },
    {
        name: "N2000 PID Controller",
        image: "https://cdn.novusautomation.com/catalogos/t-n2000_image_01.webp",
    },
    {
        name: "RTC-4 Temperature Controller",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=RTC-4",
    },
    {
        name: "DigiTop Process Indicator",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=DigiTop",
    },
    {
        name: "AirGate-Modbus Wi-Fi",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=AirGate+Modbus",
    },
    {
        name: "NOVUS Cloud Gateway NXC400",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=NXC400+Gateway",
    },
    {
        name: "TxBlock-USB Temperature Transmitter",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=TxBlock-USB",
    },
    {
        name: "TxRail-USB DIN Rail Transmitter",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=TxRail-USB",
    },
    {
        name: "RHT-Air Humidity & Temperature Transmitter",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=RHT-Air",
    },
    {
        name: "RHT-Duct Duct Humidity Transmitter",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=RHT-Duct",
    },
    {
        name: "DigiRail-2A I/O Module",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=DigiRail-2A",
    },
    {
        name: "USB-485 Converter",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=USB-485",
    },
    {
        name: "NXperience Software License",
        image: "https://placehold.co/400x400/1a1a2e/ffffff?text=NXperience",
    },
];

const fixImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        let updated = 0;
        for (const item of imageMap) {
            const result = await Product.updateOne(
                { name: item.name },
                { $set: { image: item.image } }
            );
            if (result.modifiedCount > 0) {
                console.log(`✅ Updated: ${item.name}`);
                updated++;
            } else {
                console.log(`⚠️  Not found or unchanged: ${item.name}`);
            }
        }

        console.log(`\nDone. ${updated} products updated.`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

fixImages();
