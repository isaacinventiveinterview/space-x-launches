type RocketFairings = {
  recovered: boolean;
};

type Ship = {
  name: string;
};

type Rocket = {
  rocket_name: string;
  fairings: RocketFairings;
};

type LaunchLinks = {
  article_link: string;
  flickr_images: string[];
  video_link: string;
};

export type Launch = {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  links: LaunchLinks;
  rocket: Rocket;
  details: String;
  ships: Ship[];
};
