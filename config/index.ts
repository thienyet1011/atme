import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";

// import { logoutUser } from "../actions/auth.actions";
// import { clearCurrentProfile } from "../actions/profile.actions";

import config from "./config.production.json";

export const ENCODE_EMPTY_STRING = "%02%03";
export const ATME_APP_ALLOWED_EXTENSIONS = ["image/jpeg"];
export const ATME_APP_MAX_CONTENT_LENGTH = 1 * 1024 * 1024; // 1MB

export const ATME_APP_PREFIX = config["ATME_APP_PREFIX"];
export const ATME_APP_TITLE = config["ATME_APP_TITLE"];
export const ATME_APP_TOKEN = config["ATME_APP_TOKEN"];
export const ATME_APP_PAGES_ON_RANGE = config["ATME_APP_PAGES_ON_RANGE"];
export const ATME_APP_API_ENDPOINT = config["ATME_APP_API_ENDPOINT"];
export const ATME_APP_DOMAIN = config["ATME_APP_DOMAIN"];
export const ATME_APP_UPLOAD_FILE_API = config["ATME_APP_UPLOAD_FILE_API"];
export const ATME_APP_DOWNLOAD_FILE_API =
  config["ATME_APP_DOWNLOAD_FILE_API"];

export const isExpired = token => {
  //Decode token & get user info and exp
  const decoded = jwt_decode<JwtPayload>(token);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) return true;
  else return false;
};

export const setAxiosConfig = (token, store = null, window = null) => {
  if (token) {
    if (isExpired(token)) {
      if (store) {
        // Logout user
        // store.dispatch(logoutUser());

        // Clear current Profile
        // store.dispatch(clearCurrentProfile());
      }

      if (window) {
        // Redirect to login
        window.location.href = "/login";
      }
    }

    // Apply to every request
    axios.defaults.headers["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers["Authorization"];
  }
};
