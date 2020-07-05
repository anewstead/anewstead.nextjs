import MenuIcon from '@material-ui/icons/Menu';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brandButton: {
      // textAlign: "left",
    },
    gridBrand: {
      display: 'flex',
      alignItems: 'center',
    },
    gridRoot: {
      minHeight: '80px',
    },
    gridToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      maxHeight: '80px',
    },
    gridCheckboxesOpen: {
      display: 'flex',
      justifyContent: 'center',
    },
    expansionPanel: {
      backgroundColor: 'unset',
      boxShadow: 'unset',
      width: '100%',
    },
    expansionPanelSummaryContent: {
      margin: '0 !important',
    },
    expansionPanelSummaryRoot: {
      minHeight: '80px !important',
    },
  };
});

const HeaderNavThumbs = (props) => {
  const {
    brandName,
    checkboxData,
    onBrandClick,
    onThemeClick,
    onCheckboxChange,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const checkboxes = checkboxData.map((cb, i) => {
    return (
      <FormControlLabel
        key={`cb${i}`}
        label={cb.label}
        control={
          <Checkbox
            id={cb.id}
            color="default"
            checked={cb.checked}
            onChange={onCheckboxChange}
          />
        }
      />
    );
  });

  const brand = (
    <Button
      aria-label="about"
      onClick={onBrandClick}
      className={classes.brandButton}
    >
      <Typography variant="h5" component="span">
        {brandName}
      </Typography>
    </Button>
  );

  const menuButton = (
    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
      <MenuIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton edge="start" aria-label="theme" onClick={onThemeClick}>
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const [expanded, setExpanded] = useState(false);
  const expansionPanelOnChange = (panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  };

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isSM ? 'dense' : 'regular'}>
          <Grid container justify="space-between" className={classes.gridRoot}>
            <Hidden smUp>
              <Grid item xs={10}>
                <ExpansionPanel
                  square
                  expanded={expanded === 'panel1'}
                  onChange={expansionPanelOnChange('panel1')}
                  className={classes.expansionPanel}
                >
                  <ExpansionPanelSummary
                    classes={{
                      root: classes.expansionPanelSummaryRoot,
                      content: classes.expansionPanelSummaryContent,
                    }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Grid item>
                      {/* MENU BUTTON */}
                      {menuButton}
                    </Grid>
                    <Grid
                      item
                      xs
                      container
                      justify="center"
                      className={classes.gridBrand}
                    >
                      {/* BRAND */}
                      {brand}
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid item xs={12}>
                      <FormGroup>
                        {/* CHECKBOXES */}
                        {checkboxes}
                      </FormGroup>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Hidden>

            <Hidden xsDown>
              <Grid item sm={3} md className={classes.gridBrand}>
                {/* BRAND */}
                {brand}
              </Grid>
              <Grid item sm md={5} className={classes.gridCheckboxesOpen}>
                <FormGroup row>
                  {/* CHECKBOXES */}
                  {checkboxes}
                </FormGroup>
              </Grid>
            </Hidden>

            <Grid
              item
              xs={2}
              sm={1}
              md
              container
              justify="flex-start"
              className={classes.gridToggle}
            >
              {/* TOGGLE BUTTON */}
              {toggleButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavThumbs;
