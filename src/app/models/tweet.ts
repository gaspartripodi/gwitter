export interface ITweet {
  created_at: Date;
  id?: number;
  text: string;
  user: {
    name: string;
    screen_name: string;
    verified: boolean;
    profile_image_url: string;
  };
  retweet_count: number;
  favorite_count: number;
}