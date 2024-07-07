//make sure the imgType is imported in order to use them.
import { ImgType } from "@prisma/client";

interface Image {
  id: number;
  topic_id: number;
  name: string;
  url: string;
  date_added: Date;
  date_modified: Date;
  type: ImgType;
}

export default Image;
