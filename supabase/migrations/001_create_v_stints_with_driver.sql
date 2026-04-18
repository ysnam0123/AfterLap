-- ============================================================
-- 타이어 전략 시각화를 위한 뷰
-- stints 테이블 + drivers 테이블 JOIN
-- session_key + driver_number 기준으로 조인
-- ============================================================

CREATE OR REPLACE VIEW v_stints_with_driver AS
SELECT
  s.meeting_key,
  s.session_key,
  s.stint_number,
  s.driver_number,
  s.lap_start,
  s.lap_end,
  s.compound,
  s.tyre_age_at_start,
  d.full_name,
  d.broadcast_name,
  d.name_acronym,
  d.team_name,
  d.team_colour,
  d.headshot_url
FROM stints s
JOIN drivers d
  ON s.session_key = d.session_key
 AND s.driver_number = d.driver_number;
