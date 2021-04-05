
var csv = require('fast-csv');
const pool = require('./pgdb');
import { Job } from "bull";

const dbInsertProcess = async (job: Job) => {

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});


let csvStream = csv.fromPath(".\\E:\\Rapidassignmentdata.csv", { headers: true }).on("data", function(record){
        csvStream.pause();

        if(true)
        {
            let first_name = record.first_name            ;
            let last_name = record.last_name;
            let email = record.email;
            let car_make = record.car_make;
            let car_model = record.car_model;
            let vin_number = record.vin_number;
            let manufactured_date = record.manufactured_date;

            pool.query("INSERT INTO age_of_vehicke(first_name, last_name, email, car_make, car_model, vin_number, manufactured_date) \
            VALUES($1, $2, $3, $4, $5, $6, $7)", [first_name, last_name, email, car_make, car_model, vin_number, manufactured_date], 
            function(err){
                if(err) {
                    console.log(err);
                }
            });
           
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });
};
export default dbInsertProcess;
