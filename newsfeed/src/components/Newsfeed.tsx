import * as React from "react";
import Story from "./Story";
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

export default function Newsfeed() {
  const NewsfeedQuery = graphql`
    query NewsfeedQuery {
      topStories {
        id
        ...StoryFragment
      }
    }
  `;


  const data = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery, {}
  );

  const stories = data.topStories;

  return (
    <div className="newsfeed">
      {stories.map((story) => <Story key={story.id} story={story} />)}
    </div>
  );
}
