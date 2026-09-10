import { useState } from "react";
import * as uploadFileApi from "../../api/fileApi";

export const uploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
};
