import { FC, useEffect, useState } from "react";
import { TableProp, TreatmentType } from "../types/type";
import { Modal } from "antd";
import formatMoney from "../lib/money_format";

const TreatmentModal: FC<TableProp> = ({ data, setData }) => {
  const token = localStorage.getItem("auth");
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/cure/cure-service/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ result }) => {
          setTreatments(result);
        });
    }
  }, [data.id, token]);

  return (
    <>
      <Modal
        width={600}
        title="Foydalanilgan xizmatlar bo'yicha ma'lumot"
        centered
        open={data.isOpen}
        onCancel={() => setData({ id: "", isOpen: false })}
        footer
        className="treatment_modal"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr className="table_wrapper">
            <th className="table_item">Tish id</th>
            <th className="table_item">Xizmat nomi</th>
            {/* <th className="table_item">Texnik puli</th> */}
            <th className="table_item">To'lov miqdori</th>
          </tr>
          {treatments?.map((e, i) => {
            return (
              <tr className="table_wrapper" key={i}>
                <td className="table_item">{e.tooth_id}</td>
                <td className="table_item">{e.service_name}</td>
                {/* <td className="table_item">
                  {formatMoney(+e?.raw_material_price)}
                </td> */}
                <td className="table_item">{formatMoney(+e?.price)}</td>
              </tr>
            );
          })}
          <tr className="table_wrapper">
            <th className="table_item"></th>
            <th className="table_item">Jami</th>
            {/* <th className="table_item">
              {formatMoney(
                treatments?.reduce((a, e) => {
                  return a + +e.raw_material_price;
                }, 0)
              )}
            </th> */}
            <th className="table_item">
              {formatMoney(
                treatments?.reduce((a, e) => {
                  return a + +e.price;
                }, 0)
              )}
            </th>
          </tr>
        </table>
      </Modal>
    </>
  );
};

export default TreatmentModal;
