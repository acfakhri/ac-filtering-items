export default async function handler(req: any, res: any) {
  const { limit = 40, offset = 0 } = req.query;

  try {
    const response = await fetch(
      `https://api.nekosapi.com/v4/images?limit=${limit}&offset=${offset}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch API' });
  }
}