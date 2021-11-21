import {NextApiRequest, NextApiResponse} from 'next';
import {serialize} from 'next-mdx-remote/serialize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const source = req.body;
    const mdxSource = await serialize(source);
    res.status(200).json(mdxSource);
}