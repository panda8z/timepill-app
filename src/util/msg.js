import Toast from 'react-native-root-toast';

function showMsg(msg, option) {
    if (!msg) {
        return;
    }

    if(!option) {
        option = {
            duration: 2500,
            position: -75,
            shadow: false,
            hideOnPress: true
        }
    }

    Toast.show(msg, option);
}

export default {
    showMsg
}