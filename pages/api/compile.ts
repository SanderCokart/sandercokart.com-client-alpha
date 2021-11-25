import {NextApiRequest, NextApiResponse} from 'next';
import {serialize} from 'next-mdx-remote/serialize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const source = req.body;
    try {
        const mdxSource = await serialize(source);
        res.status(200).json({ mdxSource, error: null });
    } catch (error) {
        res.status(500).json({ mdxSource: null, error: error });
    }
}