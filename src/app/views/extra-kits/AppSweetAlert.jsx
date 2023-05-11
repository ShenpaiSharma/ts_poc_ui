import swal from "sweetalert2";
import { useState } from "react";
import SweetAlert from "sweetalert2-react";
import { Breadcrumb, SimpleCard } from "@gull";
import { Button, Row, Col } from "react-bootstrap";
import { renderToStaticMarkup } from "react-dom/server";

const AppSweetAlert = () => {
  const [state, setState] = useState({
    basic1: false,
    basic2: false,
    success: false,
    error: false,
    warning: false,
    question: false,
    info: false,
    other1: false,
    other2: false,
    other3: false,
  });

  const toggleAlert = (name) => {
    setState((prevState) => ({ ...prevState, [name]: !state[name] }));
  };

  const closeAlert = (name) => {
    setState((prevState) => ({ ...prevState, [name]: false }));
  };

  let {
    basic1,
    basic2,
    success,
    error,
    info,
    warning,
    question,
    other1,
    other2,
    other3,
  } = state;

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Extra Kits", path: "/extra-kits" },
          { name: "Sweet Alert" },
        ]}
      />

      <Row>
        <Col lg={6} md={6} sm={6} xs={12} className="mb-4">
          <SimpleCard title="Basic Alert" className="h-100">
            <Button
              className="w-100 mb-2"
              onClick={() => toggleAlert("basic1")}
            >
              Alert with title
            </Button>
            <SweetAlert
              show={basic1}
              title="Title"
              text="Here's a message!"
              onConfirm={() => toggleAlert("basic1")}
            />

            <Button
              className="w-100 mb-2"
              onClick={() => toggleAlert("basic2")}
            >
              Alert with HTML
            </Button>
            <SweetAlert
              show={basic2}
              title="Demo"
              html={renderToStaticMarkup(<h1>Message from html</h1>)}
              onConfirm={() => toggleAlert("basic2")}
            />
          </SimpleCard>
        </Col>

        <Col lg={6} md={6} sm={6} xs={12} className="mb-4">
          <SimpleCard title="Alert Types" className="h-100">
            <Button
              className="w-100 mb-2"
              variant="success"
              onClick={() => toggleAlert("success")}
            >
              Success
            </Button>
            <SweetAlert
              show={success}
              title="Alert Title"
              type="success"
              text="SweetAlert in React"
              onConfirm={() => toggleAlert("success")}
            />

            <Button
              className="w-100 mb-2"
              variant="info"
              onClick={() => toggleAlert("info")}
            >
              info
            </Button>
            <SweetAlert
              show={info}
              title="Alert Title"
              type="info"
              text="SweetAlert in React"
              onConfirm={() => toggleAlert("info")}
            />

            <Button
              className="w-100 mb-2"
              variant="warning"
              onClick={() => toggleAlert("warning")}
            >
              warning
            </Button>
            <SweetAlert
              show={warning}
              title="Alert Title"
              type="warning"
              text="SweetAlert in React"
              onConfirm={() => toggleAlert("warning")}
            />

            <Button
              className="w-100 mb-2"
              variant="danger"
              onClick={() => toggleAlert("error")}
            >
              error
            </Button>
            <SweetAlert
              show={error}
              title="Alert Title"
              type="error"
              text="SweetAlert in React"
              onConfirm={() => toggleAlert("error")}
            />

            <Button
              className="w-100 mb-2"
              variant="success"
              onClick={() => toggleAlert("question")}
            >
              question
            </Button>
            <SweetAlert
              show={question}
              title="Alert Title"
              type="question"
              text="SweetAlert in React"
              onConfirm={() => toggleAlert("question")}
            />
          </SimpleCard>
        </Col>

        <Col lg={6} md={6} sm={6} xs={12} className="mb-4">
          <SimpleCard title="Other Options" className="h-100">
            <Button
              className="w-100 mb-2"
              onClick={() => toggleAlert("other1")}
            >
              Alert with Cancel
            </Button>
            <SweetAlert
              show={other1}
              title="Title with Cancel"
              text="SweetAlert in React"
              showCancelButton
              onConfirm={() => {
                console.log("confirm");
                closeAlert("other1");
              }}
              onCancel={() => {
                console.log("cancel");
                closeAlert("other1");
              }}
              onClose={() => closeAlert("other1")}
            />

            <Button
              className="w-100 mb-2"
              onClick={() => {
                swal
                  .fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No",
                  })
                  .then((result) => {
                    if (result.value) {
                      swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                      );
                    } else {
                      swal.fire("Cancelled!", "Permission denied.", "error");
                    }
                  });
              }}
            >
              Confirm Dialog
            </Button>

            <Button
              className="w-100 mb-2"
              onClick={() => {
                swal.fire({
                  title: "Sweet!",
                  text: "Modal with a custom image.",
                  imageUrl: "/assets/images/photo-wide-4.jpg",
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                });
              }}
            >
              Alert with Custo Image
            </Button>

            <Button
              className="w-100 mb-2"
              onClick={() => {
                let timerInterval;
                swal
                  .fire({
                    title: "Auto close alert!",
                    html: "I will close in <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                      swal.showLoading();
                      timerInterval = setInterval(() => {
                        swal.getContent().querySelector("b").textContent =
                          swal.getTimerLeft();
                      }, 100);
                    },
                    onClose: () => {
                      clearInterval(timerInterval);
                    },
                  })
                  .then((result) => {
                    if (
                      /* Read more about handling dismissals below */
                      result.dismiss === swal.DismissReason.timer
                    ) {
                      console.log("I was closed by the timer"); // eslint-disable-line
                    }
                  });
              }}
            >
              Self Closing Alert
            </Button>
          </SimpleCard>
        </Col>

        <Col lg={6} md={6} sm={6} xs={12} className="mb-4">
          <SimpleCard title="Special Alerts" className="h-100">
            <Button
              className="w-100 mb-2"
              onClick={() => {
                swal
                  .fire({
                    title: "Submit your Github username",
                    input: "text",
                    inputAttributes: {
                      autocapitalize: "off",
                    },
                    showCancelButton: true,
                    confirmButtonText: "Look up",
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                      return fetch(`//api.github.com/users/${login}`)
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.statusText);
                          }
                          return response.json();
                        })
                        .catch((error) => {
                          swal.showValidationMessage(
                            `Request failed: ${error}`
                          );
                        });
                    },
                    allowOutsideClick: () => !swal.isLoading(),
                  })
                  .then((result) => {
                    if (result.value) {
                      swal.fire({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url,
                      });
                    }
                  });
              }}
            >
              Alert with Server Request
            </Button>

            <Button
              className="w-100 mb-2"
              onClick={() => {
                swal
                  .mixin({
                    input: "text",
                    confirmButtonText: "Next &rarr;",
                    showCancelButton: true,
                    progressSteps: ["1", "2", "3"],
                  })
                  .queue([
                    {
                      title: "Question 1",
                      text: "Chaining swal2 modals is easy",
                    },
                    "Question 2",
                    "Question 3",
                  ])
                  .then((result) => {
                    if (result.value) {
                      const answers = JSON.stringify(result.value);
                      swal.fire({
                        title: "All done!",
                        html: `
          Your answers:
          <pre><code>${answers}</code></pre>
        `,
                        confirmButtonText: "Lovely!",
                      });
                    }
                  });
              }}
            >
              Alert with Stepper
            </Button>

            <Button
              className="w-100 mb-2"
              onClick={() => {
                const ipAPI = "//api.ipify.org?format=json";
                swal.queue([
                  {
                    title: "Your public IP",
                    confirmButtonText: "Show my public IP",
                    text:
                      "Your public IP will be received " + "via AJAX request",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                      return fetch(ipAPI)
                        .then((response) => response.json())
                        .then((data) => swal.insertQueueStep(data.ip))
                        .catch(() => {
                          swal.insertQueueStep({
                            icon: "error",
                            title: "Unable to get your public IP",
                          });
                        });
                    },
                  },
                ]);
              }}
            >
              Alert with Stepper
            </Button>
          </SimpleCard>
        </Col>

        <Col lg={6} md={6} sm={6} xs={12} className="mb-4">
          <SimpleCard title="Positioning with Animation" className="h-100">
            <Button
              className="w-100 mb-2"
              onClick={() => {
                const ipAPI = "//api.ipify.org?format=json";
                swal.fire({
                  title: "Custom Position",
                  confirmButtonText: "Ok",
                  position: "top-end",
                  icon: "success",
                  text: "Your public IP will be received " + "via AJAX request",
                  footer: `<a href="https://daneden.github.io/animate.css/">positions?</a>`,
                });
              }}
            >
              Alert with Positioning
            </Button>

            <Button
              className="w-100 mb-2"
              onClick={() => {
                swal.fire({
                  title: "Custom animation with Animate.css",
                  showClass: {
                    popup: "animated fadeInDown  faster",
                  },
                  hideClass: {
                    popup: "animated fadeOutUp  slower",
                  },
                });
              }}
            >
              Alert with Animation
            </Button>
          </SimpleCard>
        </Col>
      </Row>
    </div>
  );
};

export default AppSweetAlert;
