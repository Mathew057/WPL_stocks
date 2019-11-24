const style = theme => ({
    contentContainer: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1140px'
        },
         [theme.breakpoints.between('sm','lg')]: {
            maxWidth: '980px'
        },
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing.unit * 3,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit * 1
        }
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    content: {
        [theme.breakpoints.up('md')]:{
            paddingLeft: 240
        }
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
        backgroundColor: theme.palette.secondary.main
    },
    input:{
        height: 40
    },
     heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      tertiaryHeading: {
              fontSize: theme.typography.pxToRem(15),
              color: theme.palette.text.secondary,
              paddingLeft: '400px'
      },
      leftText: {
        textAlign: 'left'
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20
      },
     rightButton: {
        float: 'right'
     }
});

export default style;