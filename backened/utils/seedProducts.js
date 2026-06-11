import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

dotenv.config();

const products = [
    // ─── DATA LOGGERS ─────────────────────────────────────────────────
    {
        name: "FieldLogger",
        description:
            "Multichannel Industrial Data Logger for precise and connected monitoring. Features 8 universal analog input channels (thermocouples, Pt100, Pt1000, V, mV, mA), 24-bit A/D resolution, up to 1000 readings/sec, Ethernet/USB/RS485 interfaces, Modbus TCP/RTU, 32 configurable alarms, 128 virtual channels, and FDA CFR 21 Part 11 compliant.",
        price: 85000,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-multichannel_industrial_data_logger_fieldlogger_image_01.webp",
        countInStock: 15,
        rating: 4.8,
        numReviews: 24,
    },
    {
        name: "LogBox-AA",
        description:
            "Micro Data Logger for analog signals. Compact and portable data logger for voltage and current signals. Stores up to 32,700 readings with date and time stamp. Easy configuration via USB and NXperience software. Ideal for field monitoring of analog sensors.",
        price: 12500,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-logbox-aa_image_01.webp",
        countInStock: 30,
        rating: 4.5,
        numReviews: 18,
    },
    {
        name: "LogBox-RHT-LCD",
        description:
            "Micro Data Logger for temperature and humidity with LCD display. Records temperature and relative humidity with built-in sensor. Features LCD display for real-time readings, USB connectivity, configurable alarms, and stores up to 32,700 data sets. Perfect for pharmaceutical and food storage monitoring.",
        price: 9800,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-logbox-rht-lcd_image_01.webp",
        countInStock: 40,
        rating: 4.6,
        numReviews: 31,
    },
    {
        name: "LogBox Wi-Fi",
        description:
            "IoT Data Logger with Wi-Fi connectivity. Connects directly to cloud platforms for real-time remote monitoring. Records temperature, humidity and analog variables. Compatible with NOVUS Cloud, supports MQTT protocol, and features configurable alerts via email or push notification.",
        price: 18500,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-logbox-wi-fi_image_01.webp",
        countInStock: 25,
        rating: 4.7,
        numReviews: 15,
    },
    {
        name: "LogBox LTE",
        description:
            "Multichannel IoT Data Logger with 4G LTE connectivity. Logs up to 8 analog channels and transmits data over cellular networks. Ideal for remote locations without Wi-Fi. Supports MQTT, HTTP, and Modbus. Compatible with NOVUS Cloud platform.",
        price: 24000,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-logbox-lte_image_01.webp",
        countInStock: 20,
        rating: 4.6,
        numReviews: 11,
    },
    {
        name: "LogBox BLE",
        description:
            "Bluetooth Multi Channel Data Logger. Ultra-compact data logger with Bluetooth Low Energy for wireless data transfer to smartphones and tablets. Records temperature, humidity, and analog signals. Battery-powered for portable use in labs, warehouses, and cold chains.",
        price: 7500,
        category: "Data Loggers",
        image: "https://cdn.novusautomation.com/catalogos/t-logbox-ble_image_01.webp",
        countInStock: 50,
        rating: 4.4,
        numReviews: 22,
    },

    // ─── CONTROLLERS ──────────────────────────────────────────────────
    {
        name: "N1500 PID Controller",
        description:
            "Advanced PID temperature controller with dual display. Supports multiple sensor inputs including thermocouples (J, K, T, E, N, R, S) and Pt100. Features auto-tune PID, RS485 Modbus RTU communication, relay and analog outputs, and 3 programmable alarm outputs. DIN 48x96mm panel mounting.",
        price: 6500,
        category: "Controllers",
        image: "https://cdn.novusautomation.com/catalogos/t-n1500_image_01.webp",
        countInStock: 60,
        rating: 4.7,
        numReviews: 45,
    },
    {
        name: "N2000 PID Controller",
        description:
            "Universal PID controller with Ramp & Soak programming. DIN 96x96mm format. Accepts all standard thermocouple and RTD types. Supports up to 20 programmable setpoint segments. Dual RS485 ports, USB configuration interface, and multiple output options including analog, relay and SSR.",
        price: 9200,
        category: "Controllers",
        image: "https://cdn.novusautomation.com/catalogos/t-n2000_image_01.webp",
        countInStock: 35,
        rating: 4.8,
        numReviews: 38,
    },
    {
        name: "RTC-4 Temperature Controller",
        description:
            "Electronic thermostat for refrigeration and air conditioning. Compact 4-output controller designed specifically for HVAC and refrigeration applications. Features defrost management, fan control, alarm outputs, and easy front-panel programming. Widely used in commercial refrigeration systems.",
        price: 3200,
        category: "Electronic Thermostats",
        image: "https://cdn.novusautomation.com/catalogos/t-rtc4_image_01.webp",
        countInStock: 80,
        rating: 4.5,
        numReviews: 62,
    },

    // ─── DIGITAL PANEL METERS ─────────────────────────────────────────
    {
        name: "DigiTop Process Indicator",
        description:
            "Universal digital panel meter for process signals. Displays 4-20mA, 0-10V, thermocouple and RTD inputs on a bright LED display. Features configurable scaling, two relay alarm outputs, RS485 Modbus RTU, and front-panel programmable. DIN 48x96mm panel mount.",
        price: 4800,
        category: "Digital Panel Meters",
        image: "https://cdn.novusautomation.com/catalogos/t-digitop_image_01.webp",
        countInStock: 45,
        rating: 4.6,
        numReviews: 29,
    },

    // ─── IoT DEVICES ──────────────────────────────────────────────────
    {
        name: "AirGate-Modbus Wi-Fi",
        description:
            "IoT Gateway for Modbus to Wi-Fi/MQTT conversion. Connects existing Modbus RTU devices to the Internet and cloud platforms. Reads up to 48 Modbus registers, supports MQTT, HTTP, and NOVUS Cloud. Simple web-based configuration. Ideal for retrofitting legacy industrial equipment with IoT capabilities.",
        price: 15500,
        category: "IoT Devices",
        image: "https://cdn.novusautomation.com/catalogos/t-airgate-modbus_image_01.webp",
        countInStock: 28,
        rating: 4.7,
        numReviews: 19,
    },
    {
        name: "NOVUS Cloud Gateway NXC400",
        description:
            "Industrial IoT Gateway for NOVUS Cloud integration. Connects multiple NOVUS devices and third-party Modbus equipment directly to NOVUS Cloud. Supports 4G LTE, Ethernet, and Wi-Fi connectivity. Features local data storage for resilience, VPN support, and secure MQTT transmission.",
        price: 32000,
        category: "IoT Devices",
        image: "https://cdn.novusautomation.com/catalogos/t-nxc400_image_01.webp",
        countInStock: 12,
        rating: 4.9,
        numReviews: 8,
    },

    // ─── TEMPERATURE TRANSMITTERS ─────────────────────────────────────
    {
        name: "TxBlock-USB Temperature Transmitter",
        description:
            "Head-mounted temperature transmitter with USB configuration. Converts thermocouple and RTD signals to 4-20mA output. Features USB port for direct PC configuration via NXperience software, high accuracy of ±0.1% FS, supports sensor burnout detection, and wide supply voltage range.",
        price: 5200,
        category: "Temperature Transmitters",
        image: "https://cdn.novusautomation.com/catalogos/t-txblock-usb_image_01.webp",
        countInStock: 55,
        rating: 4.6,
        numReviews: 33,
    },
    {
        name: "TxRail-USB DIN Rail Transmitter",
        description:
            "DIN rail temperature transmitter with USB interface. Universal input supports all thermocouple types and Pt100/Pt1000 RTDs. Converts to isolated 4-20mA or 0-10V output. USB configuration, galvanic isolation between input and output, and suitable for industrial control cabinets.",
        price: 6800,
        category: "Temperature Transmitters",
        image: "https://cdn.novusautomation.com/catalogos/t-txrail-usb_image_01.webp",
        countInStock: 40,
        rating: 4.7,
        numReviews: 27,
    },

    // ─── HUMIDITY & TEMPERATURE ───────────────────────────────────────
    {
        name: "RHT-Air Humidity & Temperature Transmitter",
        description:
            "Indoor air humidity and temperature transmitter. Measures relative humidity (0-100% RH) and temperature (-40 to +80°C) with high accuracy. Outputs 4-20mA or 0-10V for both parameters. RS485 Modbus RTU communication, wall-mount enclosure, and suitable for HVAC, cleanrooms, and building automation.",
        price: 8900,
        category: "Humidity & Temperature",
        image: "https://cdn.novusautomation.com/catalogos/t-rht-air_image_01.webp",
        countInStock: 35,
        rating: 4.8,
        numReviews: 41,
    },
    {
        name: "RHT-Duct Duct Humidity Transmitter",
        description:
            "Duct-mount humidity and temperature transmitter for HVAC air ducts. Insertion probe design for accurate duct air measurement. Measures 0-100% RH and -40 to +60°C. Dual analog outputs (4-20mA), RS485 Modbus, LCD display option, and stainless steel probe for durability.",
        price: 11200,
        category: "Humidity & Temperature",
        image: "https://cdn.novusautomation.com/catalogos/t-rht-duct_image_01.webp",
        countInStock: 22,
        rating: 4.5,
        numReviews: 16,
    },

    // ─── GATEWAYS & CONVERTERS ────────────────────────────────────────
    {
        name: "DigiRail-2A I/O Module",
        description:
            "DIN rail I/O module with RS485 Modbus RTU. Features 2 analog inputs (4-20mA or 0-10V), 2 relay outputs, and 2 digital inputs. Expands PLC and controller systems with additional I/O points. Simple Modbus addressing, compact 22.5mm DIN rail housing, and 24VDC powered.",
        price: 4500,
        category: "I/O Modules",
        image: "https://cdn.novusautomation.com/catalogos/t-digirail-2a_image_01.webp",
        countInStock: 70,
        rating: 4.6,
        numReviews: 48,
    },
    {
        name: "USB-485 Converter",
        description:
            "USB to RS485 serial converter for industrial devices. Plug-and-play converter enabling PC connection to RS485 Modbus RTU networks. Supports baud rates up to 921.6 kbps, automatic data direction control, galvanic isolation, and LED indicators. Compatible with all NOVUS RS485 products.",
        price: 2800,
        category: "Gateways and Converters",
        image: "https://cdn.novusautomation.com/catalogos/t-usb-485_image_01.webp",
        countInStock: 100,
        rating: 4.4,
        numReviews: 73,
    },

    // ─── SOFTWARE ─────────────────────────────────────────────────────
    {
        name: "NXperience Software License",
        description:
            "Universal configuration and monitoring software for all NOVUS devices. NXperience provides device configuration, real-time data visualization, data download, report generation, and trend charts. Compatible with FieldLogger, LogBox series, TxBlock, TxRail, and all USB-configurable NOVUS products. Windows 10/11 compatible.",
        price: 0,
        category: "Software",
        image: "https://cdn.novusautomation.com/catalogos/t-nxperience_image_01.webp",
        countInStock: 999,
        rating: 4.5,
        numReviews: 55,
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        // Remove existing products seeded from Novus (by category match)
        const existingCount = await Product.countDocuments();
        console.log(`Current products in DB: ${existingCount}`);

        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} Novus Automation products`);

        // Summary by category
        const categories = [...new Set(products.map((p) => p.category))];
        categories.forEach((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            console.log(`   ${cat}: ${count} product(s)`);
        });

    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

seedProducts();
