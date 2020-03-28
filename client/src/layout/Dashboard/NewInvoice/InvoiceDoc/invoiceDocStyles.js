import { StyleSheet } from '@react-pdf/renderer';
export const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 45,
        paddingHorizontal: 35,
        color: 'black'
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40
    },
    subtitle: {
        fontSize: 16,
        margin: 12
    },
    text: {
        margin: 12,
        fontSize: 12,
        textAlign: 'justify'
    },
    image: {
        height: 150,
        marginBottom: 30,
        marginHorizontal: 100
    },
    header: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 15,
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 25,
        left: 35,
        right: 0,
        textAlign: 'center',
        color: 'grey'
    }
});
