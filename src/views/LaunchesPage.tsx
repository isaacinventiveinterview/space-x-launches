import { useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import NotesIcon from "@mui/icons-material/Notes";

import ListDropdownItem from "../components/ListDropdown";
import { getMonthDayTime } from "../utils/DateUtils";
import { sortObjectsByTime } from "../utils/SortUtils";
import { theme } from "../theme";
import { Launch } from "../types.tsx/LaunchTypes";

const LAUNCHES_QUERY = gql`
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

const LaunchesPage = () => {
  const { data: launchData, loading: launchLoading, error: launchError } = useQuery(LAUNCHES_QUERY);
  const [photosOnly, setPhotosOnly] = useState(false);

  const launchesPast = useMemo(() => {
    const sortedLaunchData =
      launchData && launchData.launchesPast
        ? launchData.launchesPast.slice().sort((a: Launch, b: Launch) => {
            return sortObjectsByTime(a.launch_date_utc, b.launch_date_utc);
          })
        : [];
    if (photosOnly) {
      return sortedLaunchData.filter((launch: Launch) => launch.links.flickr_images.length > 0);
    } else {
      return sortedLaunchData;
    }
  }, [launchData, photosOnly]);

  return (
    <div>
      <Typography variant="h1">{"SpaceX Launches"}</Typography>
      {
        <Tooltip
          title={photosOnly ? `Stop filtering by photos` : `Only show entries with photos`}
          onClick={(e) => {
            setPhotosOnly((prev) => !prev);
          }}
        >
          {photosOnly ? (
            <NoPhotographyIcon style={{ marginLeft: "40px", color: theme.palette.primary.dark }} />
          ) : (
            <PhotoLibraryIcon style={{ marginLeft: "40px", color: theme.palette.primary.dark }} />
          )}
        </Tooltip>
      }
      {launchData && launchData.launchesPast ? (
        <div style={{ paddingLeft: "40px" }}>
          {launchesPast.map((launch: Launch) => (
            <ListDropdownItem key={launch.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: theme.palette.primary.light }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle1">{`${launch.mission_name}, Launched at: ${getMonthDayTime(
                  launch.launch_date_utc
                )}`}</Typography>
                {launch.details && <NotesIcon style={{ marginLeft: "20px", color: theme.palette.primary.light }} />}
                {launch.links.flickr_images.length > 0 && (
                  <PhotoLibraryIcon style={{ marginLeft: "20px", color: theme.palette.primary.light }} />
                )}
              </AccordionSummary>
              <AccordionDetails>
                {launch.details && <Typography variant="body1">{`Details: ${launch.details}`}</Typography>}
                <Typography variant="body1">{`Rocket: ${launch.rocket.rocket_name}, ${
                  launch.rocket?.fairings?.recovered ? "was recovered" : "was not recovered"
                }`}</Typography>
                {launch.links.flickr_images.length > 0 && (
                  <>
                    <Typography variant="body1">{"Photos:"}</Typography>
                    <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
                      {launch.links.flickr_images.map((item, idx) => (
                        <ImageListItem key={item}>
                          <img
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                            alt={`Number ${idx} of launch: ${launch.mission_name}`}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </>
                )}
              </AccordionDetails>
            </ListDropdownItem>
          ))}
        </div>
      ) : launchLoading ? (
        <CircularProgress />
      ) : launchError ? (
        <pre>{launchError.message}</pre>
      ) : null}
    </div>
  );
};

export default LaunchesPage;
