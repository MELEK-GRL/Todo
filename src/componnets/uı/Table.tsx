import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { Rating } from "@mui/material";
import Button from "./Button";
import AddTaskModal from "./AddTaskModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
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
} from "../../store/candidateSlice";
import Plus from "../../assets/icon/plus";
import CustomSearch from "./CustomSearch";
import Pdf from "../../assets/icon/pdf";

interface Task {
  name: string;
  email: string;
  stage: string;
  rating: number;
  appliedJob: string;
  resume: string;
}

interface Column {
  key: "name" | "email" | "stage" | "rating" | "appliedJob" | "resume";
  label: string;
}

const Table = () => {
  const dispatch = useAppDispatch();
  const {
    candidates,
    selectedCandidates,
    searchTerm,
    sortConfig,
    visibleColumns,
    viewMode,
  } = useAppSelector((state) => state.candidates);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = React.useState(false);
  const [newTask, setNewTask] = React.useState<Partial<Task>>({
    name: "",
    email: "",
    stage: "New",
    rating: 0,
    appliedJob: "",
    resume: "",
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const columns: Column[] = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "stage", label: "Stage" },
      { key: "rating", label: "Rating" },
      { key: "appliedJob", label: "Applied job" },
      { key: "resume", label: "Resume" },
    ],
    []
  );

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter((candidate) =>
      Object.values(candidate).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig) {
      const { key, direction } = sortConfig;
      filtered.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (key === "rating") {
          const aRating = Number(aValue);
          const bRating = Number(bValue);
          return direction === "asc" ? aRating - bRating : bRating - aRating;
        }

        if (typeof aValue === "string") {
          return direction === "asc"
            ? aValue.localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue);
        }

        return 0;
      });
    }

    return filtered;
  }, [candidates, searchTerm, sortConfig]);

  const handleToggleSelect = useCallback(
    (email: string) => {
      dispatch(toggleSelectCandidate(email));
    },
    [dispatch]
  );

  const handleSelectAll = useCallback(() => {
    if (selectedCandidates.length === filteredAndSortedCandidates.length) {
      dispatch(selectAllCandidates([]));
    } else {
      dispatch(
        selectAllCandidates(filteredAndSortedCandidates.map((c) => c.email))
      );
    }
  }, [dispatch, filteredAndSortedCandidates, selectedCandidates.length]);

  const handleDeleteSelected = useCallback(() => {
    dispatch(deleteSelectedCandidates());
  }, [dispatch]);

  const handleToggleColumn = useCallback(
    (column: Column["key"]) => {
      dispatch(toggleColumn(column));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (key: Column["key"]) => {
      dispatch(
        setSortConfig({
          key,
          direction:
            sortConfig?.key === key && sortConfig.direction === "asc"
              ? "desc"
              : "asc",
        })
      );
    },
    [dispatch, sortConfig]
  );

  const handleRatingChange = useCallback(
    (email: string, newValue: number | null) => {
      dispatch(updateRating({ email, rating: newValue || 0 }));
    },
    [dispatch]
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.name && newTask.email) {
      dispatch(addCandidate(newTask as Task));
      setIsAddModalOpen(false);
      setNewTask({
        name: "",
        email: "",
        stage: "New",
        rating: 0,
        appliedJob: "",
        resume: "",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isColumnMenuOpen) {
        setIsColumnMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isColumnMenuOpen]);

  useEffect(() => {
    if (isAddModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isAddModalOpen]);

  return (
    <div className="p-2 sm:p-4 w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <h1 className="text-[30px] font-inter font-semibold leading-[30px]">
          {"Talent Pool"}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-[8px] gap-[8px]"
            iconLeft={<Plus />}
          >
            Add Talent
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={selectedCandidates.length === 0}
            className="rounded-[8px] gap-[8px]"
          >
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 justify-end">
        <CustomSearch
          value={searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search"
          className=" w-full sm:w-auto"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(setViewMode("table"))}
            className={`rounded-[8px] gap-[5px] ${
              viewMode === "table" ? "bg-gray-100" : ""
            }`}
          >
            Table View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(setViewMode("sheet"))}
            className={`rounded-[8px] gap-[5px] ${
              viewMode === "sheet" ? "bg-gray-100" : ""
            }`}
          >
            List View
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              className="flex items-center  rounded-[8px] gap-[5px]"
            >
              Columns ({visibleColumns.length}/{columns.length})
              <svg
                className={`w-4 h-4 transition-transform ${
                  isColumnMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            {isColumnMenuOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-2 border-b">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Columns</span>
                    <div className="flex gap-1">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => {
                          dispatch(
                            setVisibleColumns(columns.map((col) => col.key))
                          );
                          setIsColumnMenuOpen(false);
                        }}
                      >
                        All
                      </Button>
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => {
                          dispatch(setVisibleColumns([]));
                          setIsColumnMenuOpen(false);
                        }}
                      >
                        None
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {columns.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(column.key)}
                        onChange={() => handleToggleColumn(column.key)}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm">{column.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto mt-4">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-t-0 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      <input
                        type="checkbox"
                        checked={
                          selectedCandidates.length ===
                            filteredAndSortedCandidates.length &&
                          filteredAndSortedCandidates.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-4 w-4"
                        aria-label="Select all candidates"
                      />
                    </th>
                    {columns
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col, index) => (
                        <th
                          key={col.key}
                          className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap border-r border-gray-200 ${
                            index ===
                            columns.filter((col) =>
                              visibleColumns.includes(col.key)
                            ).length -
                              1
                              ? ""
                              : "border-r"
                          }`}
                          onClick={() => handleSort(col.key)}
                          role="button"
                          tabIndex={0}
                          aria-sort={
                            sortConfig?.key === col.key
                              ? sortConfig.direction === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                          }
                        >
                          <div className="flex items-center space-x-1">
                            <span className="capitalize">{col.label}</span>
                            {sortConfig?.key === col.key && (
                              <span>
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedCandidates.map((candidate) => (
                    <tr
                      key={candidate.email}
                      className={
                        selectedCandidates.includes(candidate.email)
                          ? "bg-blue-50"
                          : ""
                      }
                    >
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.email)}
                          onChange={() => handleToggleSelect(candidate.email)}
                          className="h-4 w-4"
                          aria-label={`Select ${candidate.email}`}
                        />
                      </td>
                      {columns
                        .filter((col) => visibleColumns.includes(col.key))
                        .map((col, index) => (
                          <td
                            key={col.key}
                            className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              index ===
                              columns.filter((col) =>
                                visibleColumns.includes(col.key)
                              ).length -
                                1
                                ? ""
                                : "border-r border-gray-200"
                            }`}
                          >
                            {col.key === "rating" ? (
                              <Rating
                                value={candidate[col.key]}
                                onChange={(_, newValue) =>
                                  handleRatingChange(candidate.email, newValue)
                                }
                                precision={0.5}
                                size="small"
                                className="text-yellow-400"
                              />
                            ) : col.key === "resume" ? (
                              <a
                                href={candidate[col.key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <Pdf />
                              </a>
                            ) : col.key === "name" ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src="/assets/user.png"
                                  alt="User"
                                  className="w-5 h-5 rounded-full"
                                />
                                {candidate[col.key]}
                              </div>
                            ) : (
                              candidate[col.key]
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {filteredAndSortedCandidates.map((candidate) => (
            <div
              key={candidate.email}
              className="border rounded p-3 sm:p-4 space-y-2 bg-white shadow-sm"
              role="article"
              aria-label={`Candidate: ${candidate.email}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.email)}
                    onChange={() => handleToggleSelect(candidate.email)}
                    className="h-4 w-4"
                    aria-label={`Select ${candidate.email}`}
                  />
                  <h3 className="font-semibold text-sm sm:text-base">
                    {candidate.name}
                  </h3>
                </div>
                <span className="text-sm text-gray-500">{candidate.email}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {columns
                  .filter((col) => col.key !== "name" && col.key !== "email")
                  .map((col) => (
                    <div key={col.key} className="flex justify-between">
                      <span className="text-gray-500">{col.label}:</span>
                      <span>{candidate[col.key]}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      )}
    </div>
  );
};

export default Table;
