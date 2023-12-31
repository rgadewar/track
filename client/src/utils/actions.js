// actions.js

// Define action types
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';

// In your actions.js file
export const SET_WEEKLY_PROGRESS = 'SET_WEEKLY_PROGRESS';


// Action creators
export const fetchActivities = (activities) => ({
  type: FETCH_ACTIVITIES,
  payload: activities,
});

export const addActivity = (activity) => ({
  type: ADD_ACTIVITY,
  payload: activity,
});

export const updateActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  payload: activity,
});

export const deleteActivity = (activityId) => ({
  type: DELETE_ACTIVITY,
  payload: activityId,
});

export const setWeeklyProgress = (weeklyProgress) => {
  return {
    type: SET_WEEKLY_PROGRESS,
    payload: weeklyProgress,
  };
};