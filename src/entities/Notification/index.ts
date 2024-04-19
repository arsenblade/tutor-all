import { reducer as notificationSlice } from './model/slices';

export {
    notificationSlice,
};

export type {INotification} from './types/Notification.types';

export {asyncActionNotifications} from './model/actions';

export {actionsNotification} from './model/slices';

export {default as Notification} from './ui/Notification';
