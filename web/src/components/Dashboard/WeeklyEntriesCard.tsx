import React, { useEffect, useState } from "react";
import { dashboardStyles } from "../../App/Dashboard";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

interface WeeklyEntriesCardProps {}

export const WeeklyEntriesCard: React.FC<WeeklyEntriesCardProps> = ({}) => {
  const classes = dashboardStyles();
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function decodeHtml(html: any) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const fetchData = () => {
    fetch("https://ranmoji.herokuapp.com/emojis/api/v.1.0/").then(
      (response) => {
        response.json().then((data) => {
          setEmoji(decodeHtml(data.emoji));
        });
      }
    );
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <>
      <Card className={classes.cards}>
        <CardContent>
          <Button size="small" onClick={handleClick}>
            <Typography variant="h3">{emoji}</Typography>
          </Button>
          <Typography variant="body2" component="p">
            A random emoji to brighten your day
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
