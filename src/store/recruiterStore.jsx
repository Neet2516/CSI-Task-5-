import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialRecruiterState = {
    totalJobsPosted: 5,
    totalApplicants: 160,
    pendingReviews: 9,
    jobPosts: [
        { id: 1, title: "Senior Frontend Developer", applicants: 15, datePosted: "Nov 05, 2025" },
        { id: 2, title: "UI/UX Designer", applicants: 45, datePosted: "Nov 05, 2025" },
        { id: 3, title: "MERN Developer", applicants: 20, datePosted: "Nov 05, 2025" },
        { id: 4, title: "Senior Backend Engineer", applicants: 57, datePosted: "Nov 06, 2025" },
        { id: 5, title: "Full Stack Engineer", applicants: 23, datePosted: "Nov 06, 2025" },
    ],
    recruiterName: "Jane Doe",
    applicantsList: [
        { id: 101, name: "Alice Johnson", job: "UI/UX Designer", status: "New", appliedDate: "Oct 30, 2025" },
        { id: 102, name: "Bob Smith", job: "Senior Frontend Developer", status: "Interview", appliedDate: "Oct 25, 2025" },
        { id: 103, name: "Charlie Brown", job: "MERN Developer", status: "Rejected", appliedDate: "Oct 28, 2025" },
    ]
};

const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState: initialRecruiterState,
    reducers: {
        deleteJobPost: (state, action) => {
            const jobIdToDelete = action.payload;
            state.jobPosts = state.jobPosts.filter(job => job.id !== jobIdToDelete);
            state.totalJobsPosted = state.jobPosts.length;
        },
        updateRecruiterName: (state, action) => {
            state.recruiterName = action.payload;
        },
        updateApplicantStatus: (state, action) => {
            const { id, status } = action.payload;
            const applicant = state.applicantsList.find(a => a.id === id);
            if (applicant) {
                applicant.status = status;
            }
        },
    },
});

export const { 
    deleteJobPost, 
    updateRecruiterName, 
    updateApplicantStatus 
} = recruiterSlice.actions;

const recruiterReducer = recruiterSlice.reducer;

export const store = configureStore({
    reducer: {
        recruiter: recruiterReducer, 
    },
});

export const selectRecruiter = (state) => state.recruiter;