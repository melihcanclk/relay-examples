import * as React from "react";
import Image from "./Image";
import { graphql, useFragment } from "react-relay";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";

export type Props = {
  poster: PosterBylineFragment$key
};

const PosterByLineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;

export default function PosterByline({ poster }: Props): React.ReactElement {
  if (poster == null) {
    return null;
  }

  const data = useFragment(
    PosterByLineFragment,
    poster
  )

  return (
    <div className="byline">
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
    </div>
  );
}
