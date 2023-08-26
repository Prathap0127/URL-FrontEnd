import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import copy from "copy-to-clipboard";
import { useCookies } from "react-cookie";

const CreateUrl = (props) => {
  const [cookies] = useCookies([]);
  const { userInfo } = useContext(UserContext);
  const user_id = userInfo?._id;
  const [urlPayload, setUrlPayload] = useState({
    originalLink: "",
    name: "",
    token: cookies.token,
  });
  const [shortUrl, setShortUrl] = useState("");
  const { originalLink, name } = urlPayload;

  const onInputChange = (e) => {
    setUrlPayload({ ...urlPayload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/urls`,
          { ...urlPayload, createdBy: user_id },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              token: cookies.token,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("URL already exists!");
            setShortUrl(`${window.location.href}` + response.data.urlCode);
          }

          if (response.status === 201) {
            toast.success(`Short URL created successfully`);
            setShortUrl(
              `${window.location.href}` + response.data.newUrlData.urlCode
            );
          }
        })
        .catch((error) => {
          console.log("Error");
          toast.warning(
            error.response.status + " " + error.response.data.message
          );
        });
    } catch (error) {
      console.log("Handle Submit" + error);
    }
  };

  const copyToClipboard = () => {
    copy(shortUrl);
    toast.success(`copied`);
  };

  return (
    <>
      <div className="container-fluid mt-2 px-0">
        <header className="py-2  mb-0">
          <div className="text-center my-1">
            <h2 className="display-4">Create a new short url</h2>
            <p className="lead mb-0"></p>
          </div>
        </header>
      </div>

      <div className="container mt-5 px-2">
        <div className="container">
          <Form id="addUrlForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>Original URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/..."
                name="originalLink"
                value={originalLink}
                onChange={(e) => onInputChange(e)}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUrlName">
              <Form.Label>URL Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Short URL's"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                autoFocus
                required
              />
            </Form.Group>
            <div className="d-flex flex-column g-3 justify-content-center align-items-center">
              <div className="p-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  form="addUrlForm"
                >
                  Generate URL
                </Button>
              </div>
              <div className="p-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.setShowUrlAddView(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Form>
        </div>

        <br />

        {Boolean(shortUrl) && (
          <>
            <Form.Group
              /* as={Col} */ className="mb-5"
              md="4"
              controlId="validationCustomUsername"
            >
              <Form.Label>
                <h3>Short Url</h3>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Short URL"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={shortUrl}
                  readOnly
                />

                <button
                  onClick={copyToClipboard}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  copy
                </button>
              </InputGroup>
            </Form.Group>
          </>
        )}
      </div>
    </>
  );
};

export default CreateUrl;
