import type {NextApiRequest, NextApiResponse} from 'next';
import {serialize} from 'next-mdx-remote/serialize';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const mdxSource = await serialize(req.body.md);
        res.status(200).json(mdxSource);
    } catch (error) {
        res.status(422);
    }
}