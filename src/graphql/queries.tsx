import { gql } from "@apollo/client";

export const LAUNCHES_QUERY = gql`
  {
    launchesPast {
      id
      mission_name
      launch_success
      mission_id
      launch_date_utc
      details
      links {
        article_link
        flickr_images
        video_link
      }
      rocket {
        rocket_name
        fairings {
          recovered
        }
      }
    }
  }
`;
