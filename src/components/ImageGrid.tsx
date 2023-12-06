import { ImageList, ImageListItem } from "@mui/material";

const ImageGrid = ({ images, setName }: { images: string[]; setName: string }) => {
  return (
    <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
      {images.map((item, idx) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt={`Number ${idx} of grid for set: ${setName} `}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGrid;
