import { Post } from '../../Post';

const PostsSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Post key={index} isLoading={true} />
      ))}
    </>
  );
};

export default PostsSkeleton;
