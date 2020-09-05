import React, { useEffect, useState } from "react";
import { dashboardStyles } from "../../App/Dashboard";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

interface WeeklyEntriesCardProps {}

export const EmojiCard: React.FC<WeeklyEntriesCardProps> = ({}) => {
  const classes = dashboardStyles();
  const [emoji, setEmoji] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://ranmoji.herokuapp.com/emojis/api/v.1.0/").then(
      (response) => {
        response.json().then((data) => {
          setEmoji(
            String.fromCodePoint(
              parseInt(data.emoji.split("").slice(3, 8).join(""), 16)
            )
          );
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
