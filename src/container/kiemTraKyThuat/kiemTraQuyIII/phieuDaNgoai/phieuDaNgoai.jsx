import { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import Pageheader from "../../../../components/pageheader/pageheader";
import { donVidata } from "../../kiemTraQuyIII/danhMuc/dinhMuc/dinhMucData";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwZM002-mVfsGaQeGlEt9qLnTK4Ef41VWhDFHlAeuH6XF_Xo9Lsiv194etMJCpzNbhiwA/exec"; // URL web app của bạn
const TOKEN = "vxphat1994@";

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const PhieuDaNgoai = () => {
  const [danhSachCN, setDanhSachCN] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [nam, setNam] = useState("");
  const [maDonVi, setMaDonVi] = useState("");
  const [tenLo, setTenLo] = useState("");
  const [kqktData, setKqktData] = useState([]);
  const [filteredLo, setFilteredLo] = useState([]);

  async function loadKQKT() {
    setLoading(true);
    try {
      const url = new URL(API_URL);
      url.searchParams.set("token", TOKEN);
      console.log("Fetching:", url.toString());
      const res = await fetch(url.toString(), { method: "GET" });
      const json = await res.json();
      setKqktData(json.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKQKT();
  }, []);

  useEffect(() => {
    console.log("Filtering data:", { nam, maDonVi, kqktData });
    if (nam && maDonVi) {
      const filteredData = kqktData.filter(
        (item) => item.nam.toString() === nam && item.doi === maDonVi
      );
      console.log("Filtered data:", filteredData);
      const uniqueLo = [...new Set(filteredData.map((item) => item.tenlo))];
      console.log("Unique lots:", uniqueLo); // Log unique lots
      setFilteredLo(uniqueLo);
      console.log("Filtered lots state updated:", filteredLo); // Log the updated state
    } else {
      setFilteredLo([]);
    }
    setTenLo(""); // Reset tenLo when nam or maDonVi changes
  }, [nam, maDonVi, kqktData]);

  const printTable = () => {
    // if (dataLo.length === 0) {
    //   alert("Không có dữ liệu để in!");
    //   return;
    // }

    const printWindow = window.open("", "_blank");
    const tableElement = document.getElementById("bangNhap");

    if (!tableElement) {
      alert("Không tìm thấy bảng dữ liệu!");
      return;
    }

    // Clone the table to avoid modifying the original
    const tableClone = tableElement.cloneNode(true);

    // Create print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Phiếu dã ngoại</title>
        <style>
          body {
            font-family: "Times New Roman", Times, serif;
            margin: 2px;
            font-size: 16px;
          }



          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 16px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
          @media print {
            body { margin: 40px; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            @page {
              margin: 2px;
            }
          }
        </style>
      </head>
      <body>
        <div>
        <p><b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b></p>
        <p><b>Đội:</b> ${
          maDonVi &&
          ` ${donVidata
            .find((dv) => dv.maDonVi === maDonVi)
            ?.donVi.toLocaleUpperCase()}`
        }</p>
        <p><b>Ngày kiểm tra: </b> ${new Date().toLocaleDateString("vi-VN")}</p>
        </div>
        <h2 style="text-align: center; margin-bottom: 20px;">
          PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO 
          ${nam && ` NĂM ${nam}`}
        </h2>
        ${tableClone.outerHTML}

        <div style="display: grid; grid-template-columns: auto auto auto; justify-content: center; gap: 0px">
            <p></p>
            <p style=" border: 1px solid #000; padding: 10px 30px; text-align: center">Trước</p>
            <p></p>
            <p style=" border: 1px solid #000; padding: 10px 30px; text-align: center">Trái</p>
            <p style=" border: 1px solid #000; padding: 10px 30px; text-align: center">5</p>
            <p style=" border: 1px solid #000; padding: 10px 30px; text-align: center">Phải</p>
            <p></p>
            <p style=" border: 1px solid #000; padding: 10px 30px; text-align: center">Sau</p>
            <p></p>
        
        </div>

        <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 30px">
          <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
            ĐẠI DIỆN ĐỘI
          </p>
          <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
            NGƯỜI KIỂM TRA
          </p>
        </div>
        
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Fragment>
      {/* <Pageheader title="Phiếu Dã Ngoại" heading="Tables" active="Tables" /> */}
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO NĂM 2024
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn năm"
                    value={nam}
                    onChange={(e) => setNam(e.target.value)}>
                    <option value="">Chọn năm</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn đơn vị"
                    value={maDonVi}
                    onChange={(e) => setMaDonVi(e.target.value)}>
                    <option value="">Chọn đơn vị</option>
                    {donVidata.map((dv) => (
                      <option key={dv.id} value={dv.maDonVi}>
                        {dv.maDonVi} - {dv.donVi}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn lô"
                    value={tenLo}
                    onChange={(e) => setTenLo(e.target.value)}
                    disabled={!nam || !maDonVi}>
                    <option value="">Chọn lô</option>
                    {filteredLo.map((lo, index) => (
                      <option key={index} value={lo}>
                        {lo}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={() => loadKQKT(keyword)}
                    disabled={loading}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                  </Button>
                  <Button
                    className="btn btn-success label-btn ms-5"
                    onClick={printTable}>
                    <i className="bi bi-printer label-btn-icon me-2"></i>
                    In phiếu
                  </Button>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xl={3}>
                  <p>
                    <b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b>
                  </p>
                  <p>
                    {" "}
                    <b>Đội:</b>
                  </p>
                  <p>
                    {" "}
                    <b>Ngày kiểm tra:</b>{" "}
                  </p>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <h4>PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO NĂM 2024</h4>
              </div>

              <div className="table-responsive mt-4">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header ">
                    <tr className="border">
                      <th className="text-wrap border" rowSpan={5}>
                        STT
                      </th>
                      <th className="text-center border" colSpan={8}>
                        Lô:........Năm trồng:.........
                      </th>
                    </tr>

                    <tr>
                      <th className="text-center border" colSpan={8}>
                        Tọa độ cây thứ I: Hàng:.....Cây:....
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center border" rowSpan={3}>
                        HT
                      </th>
                      <th className="text-center border" colSpan={4}>
                        Vanh
                      </th>
                      <th className="text-center border" colSpan={3}>
                        Nấm hồng
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center border" colSpan={2}>
                        Cây cạo
                      </th>
                      <th className="text-center border" colSpan={2}>
                        Cây chưa cạo
                      </th>
                      <th className="text-center border" rowSpan={2}>
                        C, C1
                      </th>
                      <th className="text-center border" rowSpan={2}>
                        C2+
                      </th>
                      <th className="text-center border" rowSpan={2}>
                        Cụt đọt
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center border">Trên 50</th>
                      <th className="text-center border">Dưới 50</th>
                      <th className="text-center border">Trên 50</th>
                      <th className="text-center border">Dưới 50</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 20 }, (_, i) => (
                      <tr key={i}>
                        <td className="text-center border">{i + 1}</td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                        <td className="text-center border"></td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">
                        <b>Cộng</b>
                      </td>
                      <td className="text-center border fw-bold">123</td>
                      <td className="text-center border fw-bold">123</td>
                      <td className="text-center border fw-bold"></td>
                      <td className="text-center border fw-bold"></td>
                      <td className="text-center border fw-bold"></td>
                      <td className="text-center border fw-bold"></td>
                      <td className="text-center border fw-bold"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 660px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-maCN {
          width: 120px;
        }
        .table th.col-sxkd-01012025,
        .table th.col-mocao-2025,
        .table th.col-sxkd-thanhlytc,
        .table th.col-sxkd-thanhlygdp,
        .table th.col-sxkd-31122025,
        .table th.col-ktcb-01012025,
        .table th.col-ktcb-mocao-2025,
        .table th.col-ktcb-thanhlygdp,
        .table th.col-ktcb-31122025,
        .table th.col-kh-tctm-2025,
        .table th.col-luancanh-2021,
        .table th.col-luancanh-2022,
        .table th.col-luancanh-2023,
        .table th.col-tong-luancanh,
        .table th.col-fsc,
        .table th.col-vg-vn,
        .table th.col-cho-gdp,
        .table th.col-dt-chuyentc,
        .table th.col-thanhly-goivu,
        .table th.col-tong-dt-vuon {
          width: 120px;
        }
        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default PhieuDaNgoai;
