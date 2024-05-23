import React, { useEffect } from "react";
import { useLawyerPrfofileQuery } from "../../../redux/api/userApi";
import LawyerProfileLoading from "../../skeletonLoading/LawyerProfileLoading";

const LawyerDetail = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useLawyerPrfofileQuery();
  useEffect(() => {
    if (isError) {
      console.log(error.data.message);
    }
  }, [isError, error]);
  console.log(data);

  const professionalInfo = data?.LawyerProfile?.professionalInfo;
  const education = data?.LawyerProfile?.education;
  const availability = data?.LawyerProfile?.availability;

  return (
    <section className="lg:p-md-ly-pad md:p-sm-ly-pad sm:p-2xl flex flex-col lg:gap-2 md:gap-1 gap-10">
      <div className="fieldset-border">
        <caption className="field-legend">professional info</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">Legal firm Name:</span>
              <span className="info-label-text">
                {professionalInfo?.lawFirmName}
              </span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">position Name:</span>
              <span className="info-label-text">{professionalInfo?.title}</span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">Bar Membership</span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">state</span>
              <span className="info-label-text">
                {professionalInfo?.barAdmission?.state}
              </span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">License number</span>
              <span className="info-label-text">
                {professionalInfo?.barAdmission?.licenseNumber}
              </span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">experience:</span>
              <span className="info-label-text">
                {professionalInfo?.experience}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="fieldset-border">
        <caption className="field-legend">Education</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">Institution:</span>
              <span className="info-label-text">{education?.institution}</span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">degree name:</span>
              <span className="info-label-text">{education?.degreeName}</span>
            </div>
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">completion year:</span>
              <span className="info-label-text">{`${education?.completionYear?.startYear}-${education?.completionYear?.endYear}`}</span>
            </div>
          )}
        </div>
      </div>
      <div className="fieldset-border">
        <caption className="field-legend">available at</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          {/* <div className="info-label-gap">
            <span className="info-label-text-bold">Availability hours:</span>
            <span className="info-label-text">John Doe</span>
          </div> */}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            <div className="info-label-gap">
              <span className="info-label-text-bold">Office Days:</span>
              {availability?.days?.map((day, index) => (
                <span className="info-label-text" key={index}>
                  {day}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="fieldset-border">
        <caption className="field-legend">
          Identification and License Cards
        </caption>
        <div className="flex flex-wrap md:gap-sm gap-xs">
          {/* <div className="info-label-gap">
            <span className="info-label-text-bold">Availability hours:</span>
            <span className="info-label-text">John Doe</span>
          </div> */}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            data?.LawyerProfile?.cnicPicture && (
              <div className="f-col gap-0.8">
                <span className="info-label-text-bold">CNIC Pic</span>
                <div className="card-pic">
                  <img
                    src={data?.LawyerProfile?.cnicPicture.url}
                    alt="cnic"
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>
            )
          )}
          {isLoading ? (
            <LawyerProfileLoading />
          ) : (
            data?.LawyerProfile?.lawyerIdCard && (
              <div className="f-col gap-0.8">
                <span className="info-label-text-bold">lawyer Id Card</span>
                <div className="card-pic">
                  <img
                    src={data?.LawyerProfile?.lawyerIdCard.url}
                    alt="cnic"
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default LawyerDetail;
