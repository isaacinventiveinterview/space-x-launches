export const sortObjectsByTime = (a: string | undefined | null, b: string | undefined | null) => {
  if (a && b) {
    return new Date(b).getTime() - new Date(a).getTime();
  } else if (b) {
    return 1;
  } else if (a) {
    return -1;
  } else {
    return 0;
  }
};
