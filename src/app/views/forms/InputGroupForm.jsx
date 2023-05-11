import { Breadcrumb } from "@gull";

const InputGroupForm = () => {
  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Forms", path: "/forms" },
          { name: "Input Group Form" },
        ]}
      />

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="card-title">Basic Example</div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">
                    @example.com
                  </span>
                </div>
              </div>

              <label htmlFor="basic-url">Your vanity URL</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">
                  https://example.com/users/
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title">File inputs</div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFile01">
                  Upload
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile01"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputGroupForm;
