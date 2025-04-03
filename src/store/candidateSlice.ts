import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCandidates } from "../data/data";

export interface Candidate {
  name: string;
  email: string;
  stage: string;
  rating: number;
  appliedJob: string;
  resume: string;
}

interface CandidateState {
  candidates: Candidate[];
  selectedCandidates: string[];
  searchTerm: string;
  sortConfig: {
    key: keyof Candidate;
    direction: 'asc' | 'desc';
  } | null;
  visibleColumns: (keyof Candidate)[];
  viewMode: 'table' | 'sheet';
}

const initialState: CandidateState = {
  candidates: initialCandidates,
  selectedCandidates: [],
  searchTerm: '',
  sortConfig: null,
  visibleColumns: ['name', 'email', 'stage', 'rating', 'appliedJob', 'resume'],
  viewMode: 'table',
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action: PayloadAction<Candidate>) => {
      state.candidates.push(action.payload);
    },
    deleteSelectedCandidates: (state) => {
      state.candidates = state.candidates.filter(
        candidate => !state.selectedCandidates.includes(candidate.email)
      );
      state.selectedCandidates = [];
    },
    toggleSelectCandidate: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      const index = state.selectedCandidates.indexOf(email);
      if (index === -1) {
        state.selectedCandidates.push(email);
      } else {
        state.selectedCandidates.splice(index, 1);
      }
    },
    selectAllCandidates: (state, action: PayloadAction<string[]>) => {
      state.selectedCandidates = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<{ key: keyof Candidate; direction: 'asc' | 'desc' } | null>) => {
      state.sortConfig = action.payload;
    },
    toggleColumn: (state, action: PayloadAction<keyof Candidate>) => {
      const column = action.payload;
      const index = state.visibleColumns.indexOf(column);
      if (index === -1) {
        state.visibleColumns.push(column);
      } else {
        state.visibleColumns.splice(index, 1);
      }
    },
    setVisibleColumns: (state, action: PayloadAction<(keyof Candidate)[]>) => {
      state.visibleColumns = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'table' | 'sheet'>) => {
      state.viewMode = action.payload;
    },
    updateRating: (state, action: PayloadAction<{ email: string; rating: number }>) => {
      const { email, rating } = action.payload;
      const candidate = state.candidates.find(c => c.email === email);
      if (candidate) {
        candidate.rating = rating;
      }
    },
  },
});

export const {
  addCandidate,
  deleteSelectedCandidates,
  toggleSelectCandidate,
  selectAllCandidates,
  setSearchTerm,
  setSortConfig,
  toggleColumn,
  setVisibleColumns,
  setViewMode,
  updateRating,
} = candidateSlice.actions;

export default candidateSlice.reducer; 