#
# TD Ameritrade IP Company, Inc. (c) 2007-2021
#

declare lower;
input RSILength = 21;
input RSIType = AverageType.EXPONENTIAL;
def RSIMA = MovingAverage(RSIType, RSI(), RSILength);
plot RSIMA1 = RSIMA;
input RSILength2 = 51;
input RSIType2 = AverageType.EXPONENTIAL;
def RSIMA2 = MovingAverage(RSIType2, RSI(), RSILength2);
plot RSIMA3 = RSIMA2;
def gap = -(RSIMA3 - RSIMA);
plot gap1 = gap;
input length = 14;
input over_Bought = 70;
input over_Sold = 30;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = no;

def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.color("OverBought") else if RSI < over_Sold then RSI.color("OverSold") else RSI.color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
