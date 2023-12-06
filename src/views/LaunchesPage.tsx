import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { AccordionDetails, AccordionSummary, CircularProgress, Tooltip, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import NotesIcon from "@mui/icons-material/Notes";

import ListDropdownItem from "../components/ListDropdown";
import { getMonthDayTime } from "../utils/DateUtils";
import { sortObjectsByTime } from "../utils/SortUtils";
import { theme } from "../theme";
import { Launch } from "../types.tsx/LaunchTypes";
import { LAUNCHES_QUERY } from "../graphql/queries";
import ImageGrid from "../components/ImageGrid";

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
      {launchData && launchData.launchesPast ? (
        <div style={{ paddingLeft: "40px" }}>
          <Typography variant="h1">{"SpaceX Launches"}</Typography>
          {
            <Tooltip
              title={photosOnly ? `Stop filtering by photos` : `Only show entries with photos`}
              onClick={(e) => {
                setPhotosOnly((prev) => !prev);
              }}
            >
              {photosOnly ? (
                <NoPhotographyIcon style={{ color: theme.palette.primary.dark }} />
              ) : (
                <PhotoLibraryIcon style={{ color: theme.palette.primary.dark }} />
              )}
            </Tooltip>
          }
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
                <Typography variant="body1">
                  {`Rocket: ${launch.rocket.rocket_name}, ${
                    launch.rocket?.fairings?.recovered ? "was recovered" : "was not recovered"
                  }`}
                </Typography>
                {launch.links.flickr_images.length > 0 && (
                  <>
                    <Typography variant="body1">{"Photos:"}</Typography>
                    <ImageGrid images={launch.links.flickr_images} setName={launch.mission_name} />
                  </>
                )}
              </AccordionDetails>
            </ListDropdownItem>
          ))}
        </div>
      ) : launchLoading ? (
        <CircularProgress style={{ margin: "80px", color: theme.palette.primary.dark }} />
      ) : launchError ? (
        <pre>{launchError.message}</pre>
      ) : null}
    </div>
  );
};

export default LaunchesPage;
