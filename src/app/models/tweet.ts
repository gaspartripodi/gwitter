export interface ITweet {
  created_at: Date;
  id: boolean;
  text: string;
  truncated: string;
  entities: {
    urls: []
  }
  user: {
    name: string;
    screen_name: string;
    verified: boolean;
    profile_image_url: string;
    default_profile: boolean;
    following: boolean;
  };
  retweet_count: number;
  favorite_count: number;
}