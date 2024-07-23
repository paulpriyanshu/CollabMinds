import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Regular import for axios

interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  localized: { title: string; description: string };
  thumbnails: { [key: string]: { url: string } };
}

interface ChannelContentDetails {
  relatedPlaylists: { uploads: string };
}

interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface Channel {
  id: string;
  snippet: ChannelSnippet;
  contentDetails: ChannelContentDetails;
  statistics: ChannelStatistics;
}

interface FetchChannelResponse {
  items: Channel[];
}

export interface UsersState {
  entities: Channel[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isSuccess: boolean;
  message: string;
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  isSuccess: false,
  message: "",
};

// Async thunk to fetch channel data
export const fetchChannelId = createAsyncThunk<
  FetchChannelResponse,
  string,
  {
    rejectValue: string;
  }
>(
  'channelId/fetchChannelId',
  async (access_token, { rejectWithValue }) => {
    try {
      const url = new URL('https://www.googleapis.com/youtube/v3/channels');
      url.searchParams.append('part', 'snippet,contentDetails,statistics');
      url.searchParams.append('mine', 'true');
      url.searchParams.append('key', "AIzaSyB8-CIyt-2Yq_Q9NavKi3WQ-fOJskamfNs");

      const response = await axios.get<FetchChannelResponse>(url.toString(), {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error fetching channel data:', error.response?.status, error.response?.statusText, error.response?.data);
      return rejectWithValue(error.response?.data || 'Error fetching channel data');
    }
  }
);

const channelSlice = createSlice({
  name: 'channel', // Changed to 'channel' for clarity
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelId.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchChannelId.fulfilled, (state, action) => {
        state.entities = action.payload.items;
        state.loading = 'succeeded';
        state.isSuccess = true;
        state.message = 'Channel data fetched successfully';
      })
      .addCase(fetchChannelId.rejected, (state, action) => {
        state.loading = 'failed';
        state.isSuccess = false;
        state.message = action.payload as string || 'Error fetching channel data';
      });
  },
});

export default channelSlice.reducer;
