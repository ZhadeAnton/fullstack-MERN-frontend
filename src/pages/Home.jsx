import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useGetPostsQuery, useGetTagsQuery } from '../redux/api/posts.js';
import { useGetClientDataQuery } from '../redux/api/auth.js';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import PostsSkeleton from '../components/UI/PostsSkeleton';

const defaultImageUrl =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png';
const defaultUserAvatarUrl =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png';

export const Home = () => {
  const { data: postsData, isLoading: isPostsLoading } = useGetPostsQuery();
  const { data: tagsData, isLoading: isTagsLoading } = useGetTagsQuery();
  const { data: userData, isLoading: isUserDataLoading } = useGetClientDataQuery();

  const isLoading = isPostsLoading || isTagsLoading || isUserDataLoading;

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label='basic tabs example'>
        <Tab label='Новые' />
        <Tab label='Популярные' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            <PostsSkeleton />
          ) : (
            postsData?.map((item) => (
              <Post
                key={item._id}
                id={item._id}
                title={item?.title}
                imageUrl={item?.imageUrl || defaultImageUrl}
                user={{
                  avatarUrl: item?.user?.avatarUrl || defaultUserAvatarUrl,
                  fullName: item?.user?.fullName || 'Keff',
                }}
                createdAt={item?.user?.createdAt || '12 июня 2022 г.'}
                viewsCount={item?.viewCount}
                commentsCount={3}
                tags={item?.tags || []}
                isEditable={item?.user._id === userData?._id}
              />
            ))
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tagsData} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
