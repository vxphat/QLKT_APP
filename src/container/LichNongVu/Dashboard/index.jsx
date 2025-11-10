import { useRef, Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import "@arcgis/map-components/components/arcgis-map";

const LichNongVuDashboard = () => {
    const mapRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [DonVi, setDonVi] = useState('Tất cả');

    const handleSelectDonVi = (value) => {
        setDonVi(value);

        // Bật loading trong 1 giây
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };


    useEffect(() => {
        const mapElement = mapRef.current;
        if (mapElement) {
            mapElement.addEventListener('arcgisViewReadyChange', (event) => {
                const mapView = event.target.view;
                if (mapView && mapView.map) {
                    const layers = mapView.map.layers;
                    console.log('Layer Properties:');
                    layers.forEach((layer, index) => {
                        console.log(`Layer ${index + 1}:`, {
                            id: layer.id,
                            title: layer.title,
                            type: layer.type,
                            url: layer.url,
                            visible: layer.visible,
                            opacity: layer.opacity,
                        });
                    });
                }
            });
        }
    }, []);

    const tasks = [
        { id: 1, name: "Cắt cỏ đường luồng", status: "Hoàn thành" },
        { id: 2, name: "Tỉa chồi", status: "Đang thực hiện" },
    ];

    return (
        <Fragment>
            <Row className="mt-3">
                <Col xl={12}>
                    <Card className="h-100 position-relative">
                        <Card.Body className="h-100 p-0">
                            {/* Bản đồ */}
                            <arcgis-map
                                ref={mapRef}
                                item-id="3d7b064cf07840558657c0ea8f1d552a"
                                style={{ height: "85vh", width: "100%" }}
                            ></arcgis-map>

                            {/* Danh sách công việc */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "15px",
                                    left: "15px",
                                    width: "280px",
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    padding: "10px 15px",
                                    zIndex: 10,
                                    maxHeight: "80vh",
                                    overflowY: dropdownOpen ? "visible" : "auto", // 👈 xử lý tại đây
                                }}
                            >
                                <Dropdown onToggle={(isOpen) => setDropdownOpen(isOpen)}>
                                    <Dropdown.Toggle
                                        variant="primary"
                                        id="dropdown-basic"
                                        className="w-100"
                                    >
                                        {DonVi}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="w-100">
                                        <Dropdown.Menu>
                                            {["Tất cả", "Đội An Lộc", "Đội Bình Lộc", "Đội Cẩm Mỹ"].map((name) => (
                                                <Dropdown.Item key={name} onClick={() => handleSelectDonVi(name)}>
                                                    {name}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Row className="mt-2">
                                    <Col xl={12}>
                                        {loading ? (
                                            // khi loading = true
                                            <div className="text-center">
                                                <div className="spinner-border spinner-border-sm me-4" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            // khi loading = false
                                            <>
                                                {tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        style={{
                                                            padding: "8px 10px",
                                                            marginBottom: "8px",
                                                            borderRadius: "6px",
                                                            backgroundColor:
                                                                task.status === "Hoàn thành"
                                                                    ? "#23582fff"
                                                                    : task.status === "Đang thực hiện"
                                                                        ? "#fbd967ff"
                                                                        : "#f8d7da",
                                                        }}
                                                    >
                                                        <strong>{task.name}</strong>
                                                        <div style={{ fontSize: "13px", color: "#fbfbfbff" }}>{task.status}</div>
                                                    </div>
                                                ))}
                                            </>
                                        )}


                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default LichNongVuDashboard;
