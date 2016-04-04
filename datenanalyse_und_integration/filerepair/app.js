var fs = require('fs');
const readline = require('readline');
var fails = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
read(fs);


// Testedit
function read(fs) {
    
    fs.readFile('Liste_PPN-ExNr_HSHN-libre.csv',"UTF-8", function (err, data) {
        if (!err) {
            var lines = data.split("\n");
            for (var y = 0; y< lines.length-1; y++)  {
                var line = lines[y];
                var dataset = line.split(",");
                var count = dataset[0].length;
                if(count < 9) {
                    fails++;
                }
            }

            rl.question('Your File has ' + fails + ' defect records. do you want to repair thes? (Y/N)', function (answer) {
                if (answer === "y" || answer === "Y") {
                    for (var i = 1; i < lines.length-1; i++) {
                        var line = lines[i];
                        var dataset = line.split(",");
                        var count = dataset[0].length;
                        var newLine = "";
                        if (count < 9) {
                            var value = 8 - count;      // 9 - the last X
                            var x = 0;
                            while (x <= value) {
                                newLine += "0";
                                x++;
                            }
                            newLine += dataset[0] + "X";
                            dataset[0] = newLine;
                            line = dataset.join();
                            lines[i] = line;
                        }
                    }
                    var tmpFile;
                    tmpFile = lines.join("\n");
                    console.log(tmpFile);

                } else {
                    console.log("OK bye.");
                }
                rl.close();
            });

        } else {
            console.log(err);
        }
    });
}