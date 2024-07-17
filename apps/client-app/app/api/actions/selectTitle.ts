"use server"
export const getTitleBeforeHash = (title:string) => {
    const index = title.indexOf('#');
    return index !== -1 ? title.substring(0, index) : title;
  };