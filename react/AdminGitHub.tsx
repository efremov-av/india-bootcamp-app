import React, { FC, useEffect, useState } from "react";
import {
  Layout,
  PageBlock,
  PageHeader,
  Input,
  Button,
  Spinner,
} from "vtex.styleguide";

const AdminGitHub: FC = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/_v/github-app/v0/username")
      .then((res) => res.json())
      .then((res) => {
        if (res?.userName) {
          setUserName(res.userName);
        } else {
          setUserName("");
        }
        setLoading(false);
      });
  }, []);

  return (
    <Layout pageHeader={<PageHeader title="GitHub Integration Setup" />}>
      <PageBlock variation="full">
        {isLoading && (
          <span className="dib c-muted-1">
            <Spinner />
            <br />
            <br />
          </span>
        )}

        <h5>GitHub user</h5>

        <Input
          placeholder="GitHub user"
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
        />

        <br />

        <Button
          onClick={() => {
            setLoading(true);
            fetch("/_v/github-app/v0/username", {
              method: "POST",
              body: JSON.stringify({
                userName,
              }),
            }).finally(() => {
              setLoading(false);
            });
          }}
        >
          Save
        </Button>
      </PageBlock>
    </Layout>
  );
};

export default AdminGitHub;
