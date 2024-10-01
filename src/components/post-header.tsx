import { format } from 'date-fns';

type Props = {
  title: string;
  date: string;
};

const PostHeader = ({ title, date }: Props) => (
  <div className="flex flex-col justify-center items-center p-8">
    <h1>{title}</h1>
    <p className="font-normal">{format(new Date(date), 'yyyy-MM-dd')}</p>
  </div>
);

export default PostHeader;
